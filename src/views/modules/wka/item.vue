<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-select v-model="dataForm.status" filterable placeholder="状态" @change="selectStatus">
        <el-option
          v-for="item in options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('wka:item:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="名称">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            :disabled="scope.row.title.length <= 15">
            <div>{{ scope.row.title }}</div>
            <span slot="reference" v-if="scope.row.title.length <= 15">{{scope.row.title}}</span>
            <span slot="reference" v-if="scope.row.title.length > 15">{{scope.row.title.substr(0, 15) + "..."}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        header-align="center"
        align="center"
        label="图片">
        <template slot-scope="scope">
          <div class="col-sm-3">
            <el-image style="width: 100px; height: 50px" :src="scope.row.image" fit="contain"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sellPoint"
        header-align="center"
        align="center"
        label="卖点">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            :disabled="scope.row.sellPoint.length <= 15">
            <div>{{ scope.row.sellPoint }}</div>
            <span slot="reference" v-if="scope.row.sellPoint.length <= 15">{{scope.row.sellPoint}}</span>
            <span slot="reference"
                  v-if="scope.row.sellPoint.length > 15">{{scope.row.sellPoint.substr(0, 15) + "..."}}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        :formatter="handlderPrice"
        label="零售价">
      </el-table-column>
      <el-table-column
        prop="costPrice"
        header-align="center"
        align="center"
        :formatter="handlderCostPrice"
        label="成本价">
      </el-table-column>
      <el-table-column
        prop="num"
        header-align="center"
        align="center"
        label="库存量">
      </el-table-column>
      <el-table-column
        prop="spec"
        header-align="center"
        align="center"
        label="规格"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="cname"
        header-align="center"
        align="center"
        label="分类">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status===1">已上架</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status===2">已下架</el-tag>
          <el-tag type="danger" v-else-if="scope.row.status===3">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updated"
        header-align="center"
        align="center"
        label="更新时间"
        width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status==1">
            <el-button type="text" size="small" @click="itemSoldOut(scope.row.id)">商品下架</el-button>
          </template>
          <template v-if="scope.row.status==2">
            <el-button type="text" size="small" @click="itemPutaway(scope.row.id)">商品上架</el-button>
          </template>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './item-add-or-update'

  export default {
    data() {
      return {
        options: [{
          status: '',
          label: '全部状态'
        }, {
          status: '1',
          label: '已上架'
        }, {
          status: '2',
          label: '已下架'
        }],
        dataForm: {
          status,
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      this.getDataList()
    },
    methods: {
      handlderPrice(row, column) {
        var value = this.regFenToYuan(row.price);
        return value + " 元"
      },
      handlderCostPrice(row, column) {
        var value = this.regFenToYuan(row.costPrice);
        return value + " 元"
      },
      selectStatus(value) {
        this.dataForm.status = value
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wka/item/listItem'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'status': this.dataForm.status,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 商品下架
      itemSoldOut(id) {
        this.$confirm(`确定要对该商品进行下架操作操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/item/update'),
            method: 'post',
            data: this.$http.adornData({
              'id': id,
              'status': 2
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 商品重新上架
      itemPutaway(id) {
        this.$confirm(`确定要对该商品进行上架操作操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/item/update'),
            method: 'post',
            data: this.$http.adornData({
              'id': id,
              'status': 1
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm(`确定要对该商品进行删除操作操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/item/update'),
            method: 'post',
            data: this.$http.adornData({
              'id': id,
              'status': 3
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
     /* // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wka/item/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },*/
      regFenToYuan(fen) {
        var num = fen;
        num = fen * 0.01;
        num += '';
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
        num = num.replace(reg, '$1');
        num = this.toDecimal2(num)
        return num
      },
      toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
    }
  }
</script>
