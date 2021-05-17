let deleteOperation = (element) => {
    fetch(`/operations/${element.dataset.operationId}/`, {
        method: 'DELETE'
    }).then(response => {
        location.reload();
    })
}

let deleteCategory = (element) => {
    fetch(`/categories/${element.dataset.categoryId}/`, {
        method: 'DELETE'
    }).then(response => {
        location.reload()
    })
}

let deleteAccount = (element) => {
    fetch(`/accounts/${element.dataset.accountId}/`, {
        method: 'DELETE'
    }).then(response => {
        location.reload()
    })
}