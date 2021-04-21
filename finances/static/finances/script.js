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