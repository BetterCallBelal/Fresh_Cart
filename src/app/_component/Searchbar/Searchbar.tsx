import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function Searchbar() {
  return (
    <InputGroup className="max-w-xs border-2 border-gray-500 p-6 rounded-3xl">
      <InputGroupInput placeholder="Search..."  className=""/>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
