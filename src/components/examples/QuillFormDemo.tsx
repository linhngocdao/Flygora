"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuillFlygora } from "@/components/ui/QuillFlygora";

const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuillFormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    alert("Check console for form data!");
  };

  const watchedValues = form.watch();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">QuillFlygora với React Hook Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề *</FormLabel>
                <FormControl>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Nhập tiêu đề..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả chi tiết *</FormLabel>
                <FormControl>
                  <QuillFlygora height="200px" placeholder="Nhập mô tả chi tiết..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit Form</Button>
        </form>
      </Form>

      {/* Debug Panel */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium mb-2">Form Values (Debug):</h3>
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>

      {/* Preview Panel */}
      <div className="mt-8 p-4 border rounded-lg">
        <h3 className="font-medium mb-2">Description Preview:</h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: watchedValues.description || "<p>Chưa có nội dung...</p>",
          }}
        />
      </div>
    </div>
  );
}
