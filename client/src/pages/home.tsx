import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FilePlus } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Insurance Claims Portal</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/submit-claim">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="h-6 w-6" />
                Submit New Claim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                File a new insurance claim for broken phone screen, car dent, or water damage.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/claims">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Track Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and track the status of your existing insurance claims.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
