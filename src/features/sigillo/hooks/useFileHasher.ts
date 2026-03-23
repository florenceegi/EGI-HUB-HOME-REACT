/**
 * useFileHasher — Calcola SHA-256 di un file interamente nel browser.
 *
 * Il file NON viene mai trasmesso al server.
 * Usa Web Crypto API (nativa nel browser, nessuna dipendenza esterna).
 * Supporta file grandi tramite lettura a chunk (FileReader streaming).
 */
import { useState, useCallback } from 'react';

export interface FileHasherResult {
    hash: string | null;
    isHashing: boolean;
    progress: number;       // 0.0 → 1.0
    error: string | null;
    compute: (file: File) => Promise<string | null>;
    reset: () => void;
}

const MAX_FILE_BYTES = 500 * 1024 * 1024; // 500 MB

export function useFileHasher(): FileHasherResult {
    const [hash, setHash]         = useState<string | null>(null);
    const [isHashing, setHashing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError]       = useState<string | null>(null);

    const reset = useCallback(() => {
        setHash(null);
        setHashing(false);
        setProgress(0);
        setError(null);
    }, []);

    const compute = useCallback(async (file: File): Promise<string | null> => {
        if (file.size > MAX_FILE_BYTES) {
            setError('sigillo.errors.file_too_large');
            return null;
        }

        setHashing(true);
        setProgress(0);
        setHash(null);
        setError(null);

        try {
            const result = await hashFile(file, (p) => setProgress(p));
            setHash(result);
            setProgress(1);
            return result;
        } catch (err) {
            setError('sigillo.errors.hash_failed');
            return null;
        } finally {
            setHashing(false);
        }
    }, []);

    return { hash, isHashing, progress, error, compute, reset };
}

// ---------------------------------------------------------------------------
// Implementazione interna: legge il file a chunk e aggiorna il progress
// ---------------------------------------------------------------------------

async function hashFile(
    file: File,
    onProgress: (p: number) => void
): Promise<string> {
    const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB per chunk


    // Per file piccoli (< 2 MB) usa path diretto senza streaming
    if (file.size <= CHUNK_SIZE) {
        const buffer = await file.arrayBuffer();
        onProgress(0.9);
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        onProgress(1);
        return bufferToHex(hashBuffer);
    }

    // File grandi: aggiornamento progress intermedio
    // Web Crypto API non supporta hashing incrementale nativo,
    // quindi leggiamo tutto ma aggiorniamo il progress durante la lettura.
    const buffer = await readFileWithProgress(file, CHUNK_SIZE, onProgress);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    return bufferToHex(hashBuffer);
}

function readFileWithProgress(
    file: File,
    chunkSize: number,
    onProgress: (p: number) => void
): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let offset = 0;
        const chunks: ArrayBuffer[] = [];

        const readNextChunk = () => {
            const slice = file.slice(offset, offset + chunkSize);
            reader.readAsArrayBuffer(slice);
        };

        reader.onload = (e) => {
            if (!e.target?.result) return;
            chunks.push(e.target.result as ArrayBuffer);
            offset += chunkSize;
            onProgress(Math.min(offset / file.size, 0.9));

            if (offset < file.size) {
                readNextChunk();
            } else {
                // Concatena tutti i chunk in un unico ArrayBuffer
                const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
                const combined = new Uint8Array(totalLength);
                let pos = 0;
                for (const chunk of chunks) {
                    combined.set(new Uint8Array(chunk), pos);
                    pos += chunk.byteLength;
                }
                resolve(combined.buffer);
            }
        };

        reader.onerror = () => reject(new Error('FileReader error'));
        readNextChunk();
    });
}

function bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}
