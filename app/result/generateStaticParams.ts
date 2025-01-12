export async function generateStaticParams() {

    const makesResponse = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");

    const makesData = await makesResponse.json();

    const makes = makesData.Results || [];

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, index) => 2015 + index);

    const paths = [];

    for (const make of makes) {
        for (const year of years) {
            paths.push({ make: make.MakeId.toString(), year: year.toString() });
        }

    }

    return paths;

}
