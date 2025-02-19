import { useQuery } from "@tanstack/react-query";
import type { Claim } from "@shared/schema";
import { useParams } from "wouter";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default function ClaimDetail() {
  const { id } = useParams();
  
  const { data: claim, isLoading } = useQuery<Claim>({
    queryKey: [`/api/claims/${id}`]
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!claim) {
    return <div>Claim not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Claim #{claim.id} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Claim Type</TableCell>
                <TableCell>{claim.claimType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Date of Incident</TableCell>
                <TableCell>
                  {format(new Date(claim.dateOfIncident), 'MMMM d, yyyy')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Date Submitted</TableCell>
                <TableCell>
                  {format(new Date(claim.dateSubmitted), 'MMMM d, yyyy')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {claim.status}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell className="whitespace-pre-wrap">{claim.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
