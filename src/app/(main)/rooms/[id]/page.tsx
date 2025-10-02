import RoomClient from './RoomPageClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <RoomClient roomId={id} />;
}
