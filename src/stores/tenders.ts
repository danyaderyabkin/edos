import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useNewsList = defineStore('newsList', () => {

        const getNews2 = async (url) => {
            let headers = new Headers();

            headers.append('Accept', 'application/xml');

            try {
                const response = await fetch(url, {
                    mode: 'cors',
                    credentials: 'include',
                    method: 'GET',
                    headers: headers
                });

                console.log(response);

                if (response.ok) {
                    const xml = await response.text();
                    console.log(xml);
                } else {
                    console.log('Authorization failed: ' + response.statusText);
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        }

        return {getNews2}
    }
)