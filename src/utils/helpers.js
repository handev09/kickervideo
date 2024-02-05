export function filterForEmpty(serviceItem) {
    return !!(serviceItem.selectedItem.item_name || serviceItem.name)
}