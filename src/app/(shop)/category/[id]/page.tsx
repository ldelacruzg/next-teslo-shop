import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

const categories = ['men', 'woman', 'kids']

export default function CategoryPage({ params }: Props) {
  const { id } = params

  if (!categories.includes(id)) {
    notFound()
  }

  return (
    <div>{id} Category Page</div>
  );
}