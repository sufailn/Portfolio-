import { client } from "./client";
import imageUrlBuilder from '@sanity/image-url';
import { type SanityDocument } from "next-sanity";




const PROJECT_QUERY = `*[
    _type == "project"
  ]{_id, title, description,image,tech,link}`;


const options = { next: { revalidate: 30 } };
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
    return builder.image(source)
}

export async function getProjectData() {
    const ProjectDataArr = await client.fetch<SanityDocument[]>(PROJECT_QUERY, {}, options as any);

    const projects = ProjectDataArr.map((project) => ({
        title: project.title,
        description: project.description,
        image: urlFor(project.image).url(),
        tech: project.tech,
        link: project.link,
    }));

    return projects;
}
