import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/axiom';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { event, data } = body;

        if (!event) {
            return NextResponse.json({ error: 'Event is required' }, { status: 400 });
        }

        // Clean up the data by removing nil/empty values
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) =>
                value !== null && value !== undefined && value !== ''
            )
        );

        // Add request metadata
        const logData = {
            ...cleanData,
            userAgent: request.headers.get('user-agent'),
            referer: request.headers.get('referer'),
            url: request.url,
            timestamp: new Date().toISOString(),
        };

        // Log to Axiom with request object for IP detection
        logEvent(event, logData, request);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
    }
}