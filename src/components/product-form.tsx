// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem
// } from '@/components/ui/extension/file-upload'
// import {
//   MultiSelector,
//   MultiSelectorContent,
//   MultiSelectorInput,
//   MultiSelectorItem,
//   MultiSelectorList,
//   MultiSelectorTrigger
// } from '@/components/ui/extension/multi-select'
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { FormState } from '@/types/user'
// import { formSchema } from '@/validations/product-validation'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { CloudUpload, Paperclip } from 'lucide-react'
// import { UseFormReturn, useForm } from 'react-hook-form'
// import { z } from 'zod'

// type FilesProps = {
//   files: File[] | null
//   setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
// }

// interface IProps {
//   filesState: FilesProps
// }

// const ProductForm = ({ filesState }: IProps) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       tech_stacks: [],
//       images: '',
//       price: '',
//       diskon: '',
//       sold: ''
//     }
//   })

//   const dropZoneConfig = {
//     maxFiles: 5,
//     maxSize: 1024 * 1024 * 4,
//     multiple: true
//   }

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values)
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
//         <FormField
//           control={form.control}
//           name="images"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Select File</FormLabel>
//               <FormControl>
//                 <FileUploader
//                   value={filesState.files}
//                   onValueChange={filesState.setFiles}
//                   dropzoneOptions={dropZoneConfig}
//                   className="relative rounded-lg bg-background p-2"
//                 >
//                   <FileInput id="fileInput" className="outline-dashed outline-1 outline-slate-500">
//                     <div className="flex w-full flex-col items-center justify-center p-8">
//                       <CloudUpload className="h-10 w-10 text-gray-500" />
//                       <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>
//                         &nbsp; or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
//                     </div>
//                   </FileInput>
//                   <FileUploaderContent>
//                     {filesState.files &&
//                       filesState.files.length > 0 &&
//                       filesState.files.map((file, i) => (
//                         <FileUploaderItem key={i} index={i}>
//                           <Paperclip className="h-4 w-4 stroke-current" />
//                           <span>{file.name}</span>
//                         </FileUploaderItem>
//                       ))}
//                   </FileUploaderContent>
//                 </FileUploader>
//               </FormControl>
//               <FormDescription>Select a file to upload.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="Nextnime App" required />
//               </FormControl>
//               <FormDescription>Masukkan title ptoject.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="tech_stacks"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tech Stacks</FormLabel>
//               <FormControl>
//                 <MultiSelector
//                   values={field.value}
//                   onValuesChange={field.onChange}
//                   loop
//                   className="max-w-xs"
//                 >
//                   <MultiSelectorTrigger>
//                     <MultiSelectorInput placeholder="Select Tach Stacks" className="text-sm" />
//                   </MultiSelectorTrigger>
//                   <MultiSelectorContent>
//                     <MultiSelectorList>
//                       <MultiSelectorItem value={'React'}>React</MultiSelectorItem>
//                       <MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
//                       <MultiSelectorItem value={'Svelte'}>Svelte</MultiSelectorItem>
//                     </MultiSelectorList>
//                   </MultiSelectorContent>
//                 </MultiSelector>
//               </FormControl>
//               <FormDescription>Masukkan multiple tech stack.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input {...field} type="number" min="0" />
//                 </FormControl>
//                 <FormDescription>Masukkan price.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="diskon"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Diskon</FormLabel>
//                 <FormControl>
//                   <Input {...field} type="number" min="0" />
//                 </FormControl>
//                 <FormDescription>Masukkan diskon.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="sold"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Sold</FormLabel>
//                 <FormControl>
//                   <Input {...field} type="number" min="0" />
//                 </FormControl>
//                 <FormDescription>Masukkan sold.</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }

// export default ProductForm
