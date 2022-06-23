import { DefaultUi, Player, Youtube } from '@vime/react'
import {
	DiscordLogo,
	Lightning,
	FileArrowDown,
	CaretRight,
} from 'phosphor-react'

import { gql, useQuery } from '@apollo/client';

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG_QUERY = gql`
	query GetLessonBySlug ($slug: String) {
  lesson(where: {slug: $slug}) {
    title
    videoId
    description
    teacher {
      name
      bio
      avatarURL
    }
  }
}	
`
interface GetLessonBySlugResponse {
	lesson:  {
		title: string;
		videoId: string;
		description: string;
		teacher: {
			name: string;
			bio: string;
			avatarURL: string;
		}
	}
}

interface VideoProps {
	lessonSlug: string
}

export function Video(props: VideoProps) {
	const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
		variables: {
			slug: props.lessonSlug,
		}
	})

	if(!data) {
		return (
			<div className="flex-1">
				<p>Carregando...</p>
			</div>
		)
	}

	return (
		<div className="flex-1">
			<div className="bg-gray-800 flex justify-center">
				<div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
					<Player>
						<Youtube videoId={data.lesson.videoId} />
						<DefaultUi />
					</Player>
				</div>
			</div>
			<div className="flex flex-col gap-6 md:grid md:grid-rows-2 md:grid-cols-3 md:max-h-[1024px] md:gap-3 p-4">
				<div className="row-start-1 row-end-2 col-start-1 col-end-3">
					<span className="block mb-4 font-bold">
						{data.lesson.title}
					</span>
					<p className="text-sm text-gray-300 font-thin leading-relaxed">{data.lesson.description}</p>
				</div>
				<div className="md:row-start-2 md:row-end-3 col-start-1 col-end-3 flex gap-4 items-center">
					<img
						src={data.lesson.teacher.avatarURL}
						className="h-16 w-auto rounded-full border-4 border-blue-400"
					/>
					<strong className="text-2xl text-gray-100">
						{data.lesson.teacher.name}
						<span className="block mt-2 text-gray-400 text-sm font-thin">
						{data.lesson.teacher.bio}
						</span>
					</strong>
				</div>
				<div className="md:row-start-1 mt-12 md:mt-0 md:row-end-2 col-start-3 col-end-4 flex flex-col gap-4">
					<a className="px-1 py-4 text-sm font-bold bg-green-400 rounded-md flex gap-2 items-center justify-center" href="">
						<DiscordLogo size={20} />
					 DISCORD COMMUNITY
					</a>
					<a className="px-1 py-4 text-sm font-bold text-blue-400 border-2 border-blue-400 rounded-md flex gap-2 items-center justify-center" href="">
						<Lightning size={20}/>
						TO THE CHALLENGE
					</a>
				</div>
			</div>
			<div className="w-full max-w-[1100px] mt-12 flex flex-col md:flex-row gap-6 md:gap-4 px-4 md:px-0">
				<a
					href=""
					className="h-36 md:h-32 flex-none md:flex-1 flex items-center justify-stretch gap-2 text-gray-100"
				>
					<div className="h-full p-2 flex items-center justify-center bg-green-500">
						<FileArrowDown size={40} />
					</div>
					<span className="flex-1 text-md block">
						Material complementar
						<span className="block mt-2 text-xs text-gray-300">Acesse o material complementar para acelerar o seu desenvolvimento</span>
					</span>
					<div className="h-full p-4 flex items-center justify-center">
						<CaretRight size={24} className="text-blue-400" />
					</div>
				</a>

				<a
					href=""
					className="h-36 md:h-32 flex-none md:flex-1 flex items-center justify-stretch gap-2 text-gray-100"
				>
					<div className="h-full p-2 flex items-center justify-center bg-green-500">
						<FileArrowDown size={40} />
					</div>

					<span className="flex-1 text-md block">
						Wallpapers exclusivos
						<span className="block mt-2 text-xs text-gray-300">
							Baixe wallpapers exclusivos do Ignite Lab e personalize sua máquina
						</span>
					</span>

					<div className="h-full p-4 flex items-center justify-center">
						<CaretRight
							size={24}
							className="text-blue-400"
						/>
					</div>
				</a>
			</div>
		</div>
	)
}