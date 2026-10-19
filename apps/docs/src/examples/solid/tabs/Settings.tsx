import { Tabs, TabsContent, TabsList, TabsTrigger } from "@simple-base/solid";

export default function Settings() {
  return (
    <Tabs class="preview-tabs" defaultValue="profile">
      <TabsList aria-label="Settings">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        Your name and email appear on invoices you send. Nothing is saved in this demo.
      </TabsContent>
      <TabsContent value="invoicing">
        Invoices are numbered INV-0001 onward and are due 30 days after they are sent.
      </TabsContent>
      <TabsContent value="billing">Only workspace owners can change billing details.</TabsContent>
    </Tabs>
  );
}
