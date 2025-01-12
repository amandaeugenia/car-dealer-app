import { generateStaticParams as fetchStaticParams } from '../../generateStaticParams';



// Esta função gera os parâmetros estáticos para esta rota específica

export async function generateStaticParams() {

  // Busca todos os caminhos possíveis do gerador pai

  const paths = await fetchStaticParams();

  // Mapeia os caminhos para o formato esperado por esta rota

  return paths.map((path) => ({

    make: path.make,

    year: path.year,

  }));

}