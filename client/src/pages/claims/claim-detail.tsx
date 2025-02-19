import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Claim, Document } from "@shared/schema";
import { useParams } from "wouter";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload, FileList } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default function ClaimDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: claim, isLoading: isLoadingClaim } = useQuery<Claim>({
    queryKey: [`/api/claims/${id}`]
  });

  const { data: documents, isLoading: isLoadingDocs } = useQuery<Document[]>({
    queryKey: [`/api/claims/${id}/documents`]
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // TODO: Implement actual file upload
      // For now, we'll just send metadata
      const document = {
        fileName: file.name,
        fileType: file.type,
        fileUrl: URL.createObjectURL(file)
      };

      await apiRequest("POST", `/api/claims/${id}/documents`, document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/claims/${id}/documents`] });
      toast({
        title: "Document uploaded",
        description: "Your document has been successfully uploaded"
      });
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (files: FileList) => {
    Array.from(files).forEach(file => {
      uploadMutation.mutate(file);
    });
  };

  if (isLoadingClaim) {
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
        <CardContent className="space-y-6">
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

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <FileUpload onFileSelect={handleFileSelect} />
            {isLoadingDocs ? (
              <div className="mt-4">
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <div className="mt-4">
                <FileList files={documents || []} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}