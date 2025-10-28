import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json({ error: 'postSlug requis' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('post_slug', postSlug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: data.length });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, userIdentifier } = body;

    if (!postSlug) {
      return NextResponse.json({ error: 'postSlug requis' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('likes')
      .insert([{ post_slug: postSlug, user_identifier: userIdentifier || null }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, like: data[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
