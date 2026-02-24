// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/leads/components/LeadsForReferrerTable/context";

// components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import DateTimeAt from "@/components/DateTimeAt";

// assets
import { CalendarIcon, EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";

// types
interface LeadProps {
  allLeadsForReferrer: AllLeadsForReferrer;
}

// constants
import { SERVICE_OF_INTEREST } from "@/features/leads/constants";
import { STATUS } from "@/features/leads/constants";

export default function Lead({ allLeadsForReferrer: { firstName, lastName, email, phone, serviceOfInterest, status, createdAt } }: LeadProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <>
      <h2 className="from-background via-card to-background max-w-none bg-linear-to-b from-15% to-85% p-3 uppercase">{ll["Lead Details"]}</h2>
      <Card>
        <CardHeader className="from-card via-secondary to-card bg-linear-to-r p-3">
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-9" />
            {firstName} {lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-2 uppercase">
            <EnvelopeIcon className="size-9" />
            {ll["Email"]}
          </p>
          <p className="text-muted-foreground">{email}</p>
          <br />
          <p className="flex items-center gap-2 uppercase">
            <PhoneIcon className="size-9" />
            {ll["Phone"]}
          </p>
          <p className="text-muted-foreground">{phone}</p>
          <br />
          <p className="uppercase">{ll["Service of Interest"]}</p>
          {SERVICE_OF_INTEREST(ll).find(({ value }) => value === serviceOfInterest)?.label}
          <br />
          <br />
          <p className="uppercase">{ll["Status"]}</p>
          {STATUS(ll).find(({ value }) => value === status)?.label}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-around gap-6 border-t pt-6">
          <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Submitted"]} date={createdAt} />
        </CardFooter>
      </Card>
    </>
  );
}
