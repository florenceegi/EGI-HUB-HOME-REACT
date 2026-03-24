/**
 * useCertification — Gestisce il ciclo di vita completo di una certificazione Sigillo.
 *
 * Stati: idle → selected → hashing → certifying → anchoring | done | error
 * Wrappa le chiamate API verso EGI backend (/api/sigillo/*).
 */
import { useState, useCallback } from 'react';
import { egiApi } from '../../../services/api';

// ---------------------------------------------------------------------------
// Tipi
// ---------------------------------------------------------------------------

export type CertificationState =
    | 'idle'
    | 'selected'
    | 'hashing'
    | 'certifying'
    | 'pending_email'
    | 'anchoring'
    | 'done'
    | 'error';

export type CertTier = 'free' | 'pack' | 'egili' | 'paywall';

export interface CertFile {
    name: string;
    size: number;
    mimeType: string;
    hash: string | null;
    raw: File;
}

export interface Certificate {
    uuid: string;
    status: string;
    tier: CertTier;
    created_at: string;
    file_name: string;
    file_size_human: string;
    file_hash_sha256: string;
    algorand_tx_id: string | null;
    anchored_at: string | null;
    merkle_root: string | null;
    ipfs_cid: string | null;
    email?: string;
}

export interface PaywallInfo {
    reason: string;
    egili_balance?: number;
}

export interface VerifyResult {
    is_valid: boolean;
    anchored_at: string | null;
    algorand_tx_id: string | null;
    merkle_root: string | null;
}

export interface UseCertificationResult {
    state: CertificationState;
    file: CertFile | null;
    certificate: Certificate | null;
    paywallInfo: PaywallInfo | null;
    errorMessage: string | null;
    selectFile: (file: File) => void;
    setHash: (hash: string) => void;
    certify: (email?: string) => Promise<void>;
    verify: (uuid: string, fileHashSha256: string) => Promise<VerifyResult | null>;
    getCertificate: (uuid: string) => Promise<Certificate | null>;
    confirmFromUrl: (uuid: string) => Promise<void>;
    reset: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCertification(): UseCertificationResult {
    const [state, setState]             = useState<CertificationState>('idle');
    const [file, setFile]               = useState<CertFile | null>(null);
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [paywallInfo, setPaywallInfo] = useState<PaywallInfo | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const reset = useCallback(() => {
        setState('idle');
        setFile(null);
        setCertificate(null);
        setPaywallInfo(null);
        setErrorMessage(null);
    }, []);

    const selectFile = useCallback((raw: File) => {
        setFile({
            name: raw.name,
            size: raw.size,
            mimeType: raw.type,
            hash: null,
            raw,
        });
        setState('selected');
        setPaywallInfo(null);
        setErrorMessage(null);
    }, []);

    const setHash = useCallback((hash: string) => {
        setFile((prev) => prev ? { ...prev, hash } : prev);
        setState('selected');
    }, []);

    const certify = useCallback(async (email?: string) => {
        if (!file?.hash) return;

        setState('certifying');
        setPaywallInfo(null);
        setErrorMessage(null);

        try {
            const body: Record<string, unknown> = {
                file_hash_sha256: file.hash,
                file_name:        file.name,
                file_size_bytes:  file.size,
                file_mime_type:   file.mimeType || null,
            };
            if (email) body.email = email;

            const response = await egiApi.post('/sigillo/certify', body);
            const data = response.data;

            // Costruisce il certificato parziale (non ancora ancorato)
            const cert: Certificate = {
                uuid:             data.uuid,
                status:           data.status,
                tier:             data.tier,
                created_at:       data.created_at,
                file_name:        file.name,
                file_size_human:  formatFileSize(file.size),
                file_hash_sha256: file.hash,
                algorand_tx_id:   null,
                anchored_at:      null,
                merkle_root:      null,
                ipfs_cid:         null,
                email:            email,
            };

            setCertificate(cert);

            if (data.status === 'pending_email') {
                // Utente anonimo: in attesa di conferma email
                setState('pending_email');
            } else {
                setState('anchoring');
            }

        } catch (err: any) {
            if (err?.response?.status === 402) {
                // Gate fallito → paywall
                setPaywallInfo({
                    reason:        err.response.data?.code ?? 'PAYWALL',
                    egili_balance: err.response.data?.egili_balance,
                });
                setState('error');
            } else {
                setErrorMessage('sigillo.errors.certify_failed');
                setState('error');
            }
        }
    }, [file]);

    const getCertificate = useCallback(async (uuid: string): Promise<Certificate | null> => {
        try {
            const response = await egiApi.get(`/sigillo/${uuid}`);
            const data = response.data;

            const cert: Certificate = {
                uuid:             data.uuid,
                status:           data.status,
                tier:             'free',
                created_at:       data.created_at,
                file_name:        data.file_name,
                file_size_human:  data.file_size_human,
                file_hash_sha256: data.file_hash_sha256,
                algorand_tx_id:   data.algorand_tx_id,
                anchored_at:      data.anchored_at,
                merkle_root:      data.merkle_root,
                ipfs_cid:         data.ipfs_cid,
                email:            data.email,
            };

            if (data.status === 'anchored') {
                setCertificate(cert);
                setState('done');
            }

            return cert;
        } catch {
            return null;
        }
    }, []);

    /**
     * Chiamato da SigilloPage quando l'URL contiene ?confirmed=UUID.
     * Recupera lo stato del certificato e aggiorna la macchina a stati di conseguenza.
     */
    const confirmFromUrl = useCallback(async (uuid: string): Promise<void> => {
        try {
            const response = await egiApi.get(`/sigillo/${uuid}`);
            const data = response.data;

            const cert: Certificate = {
                uuid:             data.uuid,
                status:           data.status,
                tier:             data.tier ?? 'free',
                created_at:       data.created_at,
                file_name:        data.file_name,
                file_size_human:  data.file_size_human,
                file_hash_sha256: data.file_hash_sha256,
                algorand_tx_id:   data.algorand_tx_id,
                anchored_at:      data.anchored_at,
                merkle_root:      data.merkle_root,
                ipfs_cid:         data.ipfs_cid,
                email:            data.email,
            };

            setCertificate(cert);

            if (data.status === 'anchored') {
                setState('done');
            } else if (data.status === 'pending' || data.status === 'anchoring') {
                setState('anchoring');
            }
            // Se status è ancora 'pending_email' rimane nello stato che il componente padre
            // gestisce tramite il banner — non forziamo uno stato qui.
        } catch {
            // Errore silenzioso: il banner di errore è gestito da SigilloPage
        }
    }, []);

    const verify = useCallback(async (
        uuid: string,
        fileHashSha256: string
    ): Promise<VerifyResult | null> => {
        try {
            const response = await egiApi.post('/sigillo/verify', { uuid, file_hash_sha256: fileHashSha256 });
            return response.data as VerifyResult;
        } catch {
            return null;
        }
    }, []);

    return {
        state, file, certificate, paywallInfo, errorMessage,
        selectFile, setHash, certify, verify, getCertificate, confirmFromUrl, reset,
    };
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1073741824).toFixed(2)} GB`;
}
