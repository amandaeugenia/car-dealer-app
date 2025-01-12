import { generateStaticParams as fetchStaticParams } from '../../generateStaticParams';

export async function generateStaticParams() {

  const paths = await fetchStaticParams();
  return paths.map((path) => ({

    make: path.make,
    year: path.year,

  }));

}