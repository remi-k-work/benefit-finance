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

const INTERNAL_NOTES = [
  "*Initial Contact Attempt* Called on 2026-02-20. No answer. Left voicemail introducing our credit advisory services. Will attempt follow-up in 2 days.",
  "*Successful First Call* Spoke with client. Interested in subsidies related to home renovation. Requested more details via email. Sent initial documentation and checklist. Waiting for response.",
  "*Qualified Lead* Client confirmed interest in mortgage refinancing. Monthly income and employment status verified. Appears eligible based on initial screening. Scheduled in-person consultation for next Tuesday at 10:00.",
  "*Rejected Lead* Contacted client. Not interested at this time — already signed with another provider. Marking as rejected. No further follow-up required.",
  "*Converted to Client* Consultation completed. Client agreed to proceed with insurance package. Documents signed electronically. Forwarded case to onboarding team.",
  "*Not Sure / Needs Clarification* Client unsure which service fits their needs. Discussed both credits and subsidies options. Sent comparison overview. Follow-up call scheduled for Friday.",
  "*Incomplete Contact Info* Attempted contact but phone number unreachable. Email sent requesting confirmation of correct contact details. Awaiting reply before proceeding.",
] as const;

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const LEAD = (referredByEmail: string) =>
  Array.from({ length: 5 }).map((_, index) => {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@gmail.com`;

    return {
      referredByEmail,
      firstName,
      lastName,
      email,
      phone: `555-01${String(index).padStart(2, "0")}`,
      serviceOfInterest: randomItem(SERVICES),
      status: randomItem(STATUSES),
      internalNotes: randomItem(INTERNAL_NOTES),
    };
  });
