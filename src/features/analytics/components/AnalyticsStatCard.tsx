/**
 * @package EGI-HUB-HOME — AnalyticsStatCard
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose Card KPI singola per la dashboard Web Analytics superadmin
 */
interface AnalyticsStatCardProps {
    label: string;
    value: string | number;
    sublabel?: string;
    loading?: boolean;
}

function SkeletonRect({ className }: { className: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${className}`}
            aria-hidden="true"
        />
    );
}

export function AnalyticsStatCard({ label, value, sublabel, loading }: AnalyticsStatCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {label}
            </span>
            {loading ? (
                <>
                    <SkeletonRect className="h-8 w-24 mt-1" />
                    {sublabel !== undefined && <SkeletonRect className="h-3 w-16 mt-1" />}
                </>
            ) : (
                <>
                    <span className="text-3xl font-bold text-gray-900 tabular-nums">
                        {typeof value === 'number' ? value.toLocaleString('it-IT') : value}
                    </span>
                    {sublabel && (
                        <span className="text-xs text-gray-400">{sublabel}</span>
                    )}
                </>
            )}
        </div>
    );
}
