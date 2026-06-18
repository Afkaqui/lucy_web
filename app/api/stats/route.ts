import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Scans and users are always available — query them independently
  const [scans, users] = await Promise.all([
    prisma.scan.count().catch(() => 0),
    prisma.user.count().catch(() => 0),
  ]);

  // site_stats may not exist yet if migration is pending — fail gracefully
  let pageViews = 0;
  try {
    const stats = await prisma.siteStats.upsert({
      where: { id: 1 },
      create: { pageViews: 1 },
      update: { pageViews: { increment: 1 } },
    });
    pageViews = stats.pageViews;
  } catch {
    // Table not yet migrated — keep pageViews at 0
  }

  return NextResponse.json({ scans, users, pageViews, lesionTypes: 7 });
}
