import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export async function GET(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const all = searchParams.get('all');

  if (all === 'true') {
    const team = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [
        { isFounder: 'desc' },
        { displayOrder: 'asc' },
        { created_at: 'desc' }
      ]
    });

    return NextResponse.json({
      team,
      totalItems: team.length
    });
  }

  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '6');
  const skip = (pageNum - 1) * limitNum;

  const totalCount = await prisma.teamMember.count({
    where: { isActive: true }
  });
  const totalPages = Math.ceil(totalCount / limitNum);

  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [
      { isFounder: 'desc' },
      { displayOrder: 'asc' },
      { created_at: 'desc' }
    ],
    skip: skip,
    take: limitNum,
  });

  return NextResponse.json({
    team,
    pagination: {
      currentPage: pageNum,
      totalPages: totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNum,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    }
  });
}

export async function POST(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can create team members" }, { status: 403 });
  }

  const { image, imagePublicId, name, role, description, isFounder, displayOrder } = await req.json();

  if (!name || !role || !description || !image) {
    return NextResponse.json(
      { error: "Name, role, description, and image are required" },
      { status: 400 }
    );
  }

  const newTeamMember = await prisma.teamMember.create({
    data: { 
      image, 
      imagePublicId, 
      name, 
      role, 
      description, 
      isFounder: isFounder || false, 
      displayOrder: displayOrder || 0 
    },
  });

  return NextResponse.json(newTeamMember, { status: 201 });
}