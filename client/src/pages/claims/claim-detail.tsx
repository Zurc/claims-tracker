import { useQuery, useMutation } from "@tanstack/react-query";
import type { Claim } from "@shared/schema";
import { useParams, useLocation } from "wouter";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ClaimDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: claim, isLoading } = useQuery<Claim>({
    queryKey: [`/api/claims/${id}`],
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/claims/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/claims"] });
      toast({
        title: "Claim Deleted",
        description: "The claim has been successfully deleted.",
      });
      navigate("/claims");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete claim. Please try again.",
        variant: "destructive",
      });
    },
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Claim #{claim.id} Details</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Claim</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this claim? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                  {format(new Date(claim.dateOfIncident), "MMMM d, yyyy")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Date Submitted</TableCell>
                <TableCell>
                  {format(new Date(claim.dateSubmitted), "MMMM d, yyyy")}
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
                <TableCell className="whitespace-pre-wrap">
                  {claim.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
