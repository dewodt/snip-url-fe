import { ref } from 'vue'

export function useNavBar() {
  const isNavBarExpanded = ref(false)
  const toggleNavBarExpanded = () => (isNavBarExpanded.value = !isNavBarExpanded.value)

  return {
    isNavBarExpanded,
    toggleNavBarExpanded
  }
}
