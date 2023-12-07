import { PageOptionsDto } from '@common/dto'
import { FindManyOptions, ILike, Repository } from 'typeorm'
import * as _ from 'lodash'
import { PageVo } from '@common/vo'
import { SysUser } from '@/entity'
import { User } from '@/entity/user.entity'

export function enhanceQuery<E, P extends PageOptionsDto>(repo: Repository<E>) {
  class EnhanceQuery {
    async page(PageOptionsDto: P, options?: FindManyOptions<E>) {
      const query = _.omit(PageOptionsDto, ['page', 'pageSize'])
      // # 搜索
      const where = buildSearchWhere(query)
      const [list, count] = await repo.findAndCount({
        skip: (PageOptionsDto.page - 1) * PageOptionsDto.pageSize,
        take: PageOptionsDto.pageSize,
        where,
        ...options,
      })
      const pageVo = new PageVo()
      pageVo.list = list
      pageVo.page = PageOptionsDto.page
      pageVo.pageSize = PageOptionsDto.pageSize
      pageVo.pageCount = Math.ceil(count / PageOptionsDto.pageSize)
      pageVo.total = count
      return pageVo
    }

    async listWithSearch(query: object, options?: FindManyOptions<E>) {
      const where = buildSearchWhere(query)
      return repo.find({ where, ...options })
    }
    // more query
  }
  return new EnhanceQuery() as EnhanceQuery
}

function buildSearchWhere(query: any) {
  let where: any
  // 搜索
  if (!_.isEmpty(query)) {
    const strQuery: any = {}
    const elseQuery: any = {}
    for (const key in query) {
      if (_.isString(query[key]))
        strQuery[key] = query[key]
      else
        elseQuery[key] = query[key]
    }
    where = {
    // - 字符类型字段模糊匹配
      ..._.mapValues(strQuery, val => ILike(`%${val}%`)),
      // - 其他字段精确匹配
      ...elseQuery,
    }
    // TODO 更多搜索条件
  }
  return where
}

export function SelectMapBuilder<
  Entity extends new () => any,
  R extends Record<string, Array<keyof InstanceType<Entity>>>,
>(_: Entity, map: R) {
  return map
}
