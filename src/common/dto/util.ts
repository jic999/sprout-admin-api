import { Type } from '@nestjs/common'
import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types'

export function ValidatorClassBuilder<T, N extends keyof T, E extends keyof T>(
  Entity: Type<T>,
  necessary: readonly N[],
  optional: readonly E[],
) {
  return IntersectionType(
    PickType(Entity, necessary),
    PartialType(PickType(Entity, optional)),
  )
}
