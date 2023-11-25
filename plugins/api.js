import apiUrl from '@/constants/api'

export default function ({ app }, inject) {
    inject('api', apiUrl)
}
