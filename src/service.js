
class ItemService {

    async validateToken() {
        return fetch('https://wakanda-cm.developerprogram.org/api/v1/validate', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": window.localStorage.token
            },
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    async refreshToken() {
        return fetch('https://wakanda-cm.developerprogram.org/api/v1/accessToken', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "refresh-token": window.localStorage.refreshToken
            },
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
            .catch(error => {
                this.handleError(error);
            });
    }

    async login(newitem) {
        return fetch('https://wakanda-cm.developerprogram.org/api/v1/login', {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newitem)
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    async pageProperty() {
        return fetch('https://wakanda-cm.developerprogram.org/api/v1/channel/page/show?uuid=7c41b988-ba6f-4785-9750-6075e18a3c1c', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": window.localStorage.token
            },
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
            .catch(error => {
                this.handleError(error);
            });
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error);
    }
}
export default ItemService;