// Bunch of example leads to seed the database with
const SERVICES = ["subsidies", "credits", "insurance", "not sure"] as const;
const STATUSES = ["during", "accepted", "rejected"] as const;

const FIRST_NAMES = [
  "John",
  "Anna",
  "Michael",
  "Emily",
  "David",
  "Sophia",
  "Daniel",
  "Olivia",
  "James",
  "Isabella",
  "Liam",
  "Mia",
  "Noah",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Ethan",
  "Harper",
  "Alexander",
  "Evelyn",
] as const;

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Brown",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
] as const;

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const LEAD = Array.from({ length: 60 }).map((_, index) => {
  const firstName = randomItem(FIRST_NAMES);
  const lastName = randomItem(LAST_NAMES);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@gmail.com`;

  return {
    referredByEmail: "penny.saver@benefit.demo",
    firstName,
    lastName,
    email,
    phone: `555-01${String(index).padStart(2, "0")}`,
    serviceOfInterest: randomItem(SERVICES),
    status: randomItem(STATUSES),
  };
});
