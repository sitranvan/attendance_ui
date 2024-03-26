import { SubjectResponse, UserSubjectResponse } from '~/types/subject.type'
import http from '~/utils/http'

export const getAllSubjectApi = () => http.get<SubjectResponse>(`/subjects`)
export const getStudentToSubjectApi = (subjectId: string) =>
    http.get<UserSubjectResponse>(`/subjects/students/${subjectId}`)
