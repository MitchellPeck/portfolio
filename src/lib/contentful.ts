import contentful from "contentful";
import type { EntryFieldTypes } from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export interface Project {
  contentTypeId: "project";
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    image: EntryFieldTypes.Object;
    fullImage: EntryFieldTypes.Object;
    url: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    priority: EntryFieldTypes.Number;
    overview: EntryFieldTypes.RichText;
    techStack: EntryFieldTypes.RichText;
  };
}

export interface Post {
  contentTypeId: "post";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    content: EntryFieldTypes.RichText;
    publishedDate: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
  };
}

export interface Experience {
  contentTypeId: "experience";
  fields: {
    startDate: EntryFieldTypes.Date;
    endDate: EntryFieldTypes.Date;
    role: EntryFieldTypes.Text;
    company: EntryFieldTypes.Text;
    logo: EntryFieldTypes.Object;
    type: EntryFieldTypes.Text;
    typeDescription: EntryFieldTypes.Text;
  };
}
