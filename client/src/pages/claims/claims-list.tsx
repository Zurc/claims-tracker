import { useQuery, useMutation } from "@tanstack/react-query";
import type { Claim } from "@shared/schema";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

function ClaimStatusBadge({ status }: { status: string }) {
  const colors = {
    Submitted: "bg-blue-100 text-blue-800",
    "Under Review": "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Denied: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm ${
        colors[status as keyof typeof colors]
      }`}
    >
      {status}
    </span>
  );
}

export default function ClaimsList() {
  const { toast } = useToast();
  const { data: claims, isLoading } = useQuery<Claim[]>({
    queryKey: ["/api/claims"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/claims/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/claims"] });
      toast({
        title: "Claim Deleted",
        description: "The claim has been successfully deleted.",
      });
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
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Claims</CardTitle>
          <Link href="/submit-claim">
            <Button>New Claim</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {claims?.length === 0 && (
            <p className="text-muted-foreground">No claims found.</p>
          )}
          {claims && claims?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims?.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>#{claim.id}</TableCell>
                    <TableCell>{claim.claimType}</TableCell>
                    <TableCell>
                      {format(new Date(claim.dateSubmitted), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <ClaimStatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/claims/${claim.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Claim</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete claim #{claim.id}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(claim.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
