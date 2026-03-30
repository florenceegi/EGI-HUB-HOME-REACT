/**
 * @package EGI-HUB-HOME — AnalyticsEventChart
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose BarChart recharts per distribuzione eventi per tipo (Web Analytics)
 */
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import type { EventByNameEntry } from '../../../services/endpoints/analyticsApi';

interface AnalyticsEventChartProps {
    events: EventByNameEntry[];
    loading?: boolean;
}

const PALETTE = [
    '#2563eb', '#7c3aed', '#059669', '#d97706',
    '#dc2626', '#0891b2', '#65a30d', '#9333ea',
];

function SkeletonBar() {
    return (
        <div className="space-y-2" aria-hidden="true">
            {[80, 60, 45, 35, 20].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="animate-pulse bg-gray-200 rounded h-4" style={{ width: `${w}%` }} />
                </div>
            ))}
        </div>
    );
}

export function AnalyticsEventChart({ events, loading }: AnalyticsEventChartProps) {
    if (loading) {
        return (
            <div className="h-48 flex items-end px-2">
                <SkeletonBar />
            </div>
        );
    }

    if (!events.length) {
        return (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                Nessun evento nel periodo selezionato.
            </div>
        );
    }

    // Tronca label a 18 caratteri per leggibilita'
    const data = events.slice(0, 10).map((e) => ({
        name: e.event_name.length > 18 ? e.event_name.slice(0, 16) + '…' : e.event_name,
        full: e.event_name,
        count: e.count,
    }));

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 4, right: 24, bottom: 4, left: 4 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 11 }}
                />
                <Tooltip
                    formatter={(value, _name, props) => [
                        typeof value === 'number'
                            ? value.toLocaleString('it-IT')
                            : String(value ?? ''),
                        (props as any)?.payload?.full ?? _name,
                    ]}
                    contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {data.map((_entry, index) => (
                        <Cell key={index} fill={PALETTE[index % PALETTE.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
