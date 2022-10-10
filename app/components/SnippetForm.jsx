import { Form, useParams } from "@remix-run/react";
import Button from "./Button";
import FormField from "./FormField";

// This component is used on the create and update snippet pages.
export default function SnippetForm({ errors, action, snippetFolders }) {
  const params = useParams();

  return (
    // The action will be "/update" or "/create" depending on which page the SnippetForm is used on.
    <Form method="POST" action={action} className="rounded-2xl bg-gray-200 p-6">
      <FormField label="Title" name="title" type="text" errors={errors?.title} element="input" />
      <FormField label="Description" name="description" type="text" errors={errors?.description} element="textarea" />
      <FormField label="Code" name="code" type="text" errors={errors?.code} element="textarea" />
      <FormField label="Language" name="language" type="text" errors={errors?.language} element="select">
        <option value="">Select a language</option>
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </FormField>
      <FormField
        label="Snippet Folder"
        name="snippetFolder"
        type="text"
        errors={errors?.snippetFolder}
        element="select"
        defaultValue={params.snippetFolderId}
      >
        <option value="">Select a folder</option>
        {snippetFolders.map((folder) => (
          <option key={folder._id} value={folder._id}>
            {folder.name}
          </option>
        ))}
      </FormField>
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errors?.snippetFolder?.message}
      </div>
      <div className="w-full text-center">
        <Button type="submit" primary={true}>
          Save
        </Button>

        {/* This error message will be displayed if something went really wrong.*/}
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{errors?.error}</div>
      </div>
    </Form>
  );
}
