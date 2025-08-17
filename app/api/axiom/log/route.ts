import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/axiom';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { event, data } = body;

        if (!event) {
            return NextResponse.json({ error: 'Event is required' }, { status: 400 });
        }

        // Add request metadata
        const logData = {
            ...data,
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