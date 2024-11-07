import { IProject } from "@/redux/slices/projects";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9983/api",
	}),
	endpoints: (builder) => ({
		getProjects: builder.query<IProject[], void>({
			query: () => ({
				url: "/projects/",
				method: "GET",
			}),
		}),
		insertProject: builder.mutation<IProject[], IProject>({
			query: (data) => ({
				url: "/projects/",
				method: "POST",
				body: data,
			}),
		}),
		deleteProject: builder.mutation<IProject[], string>({
			query: (projectId) => ({
				url: `/projects/${projectId}`,
				method: "DELETE",
			}),
		}),
		uploadProjectImage: builder.mutation<{ message: string; imagePath: string }, FormData>({
			query: (data) => ({
				url: "/projectImage/upload",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useGetProjectsQuery, useInsertProjectMutation, useDeleteProjectMutation, useUploadProjectImageMutation } = api;
