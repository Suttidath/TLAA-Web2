export const deliveryTracking_headers = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'DO',
        name: 'DO'
    },
    {
        key: 'driverId',
        name: 'Driver ID'
    },
    {
        key: 'location',
        name: 'Location'
    },
]
export const fleetTracking_headers = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'DO',
        name: 'DO'
    },
    {
        key: 'status',
        name: 'Status'
    },
    {
        key: 'location',
        name: 'Location'
    },

]
export const deliveryOrder_headers = [
    {
        field: 'doID',
        headerName: 'Deliver ID',
        width: 150
    },
    {
        field: 'do_date',
        headerName: 'Delivery Date',
        width: 150
    },
    {
        field: 'req_date',
        headerName: 'Arrange time - request_date',
        width: 200
    },
    {
        field: 'client',
        headerName: 'Client',
        width: 150
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 100,

    },
    {
        field: 'DO',
        headerName: 'Delivery Order No.',
        width: 150
    },
    // {
    //     field: 'action',
    //     headerName: 'action',
    //     width: 100,
    //
    // },

]
export const routePlanning_headers = [
    {
        field: 'route_name',
        headerName: 'Route Name',
        textAlign:'left',
        width:200
    },
    {
        field: 'shipto_plan',
        headerName: 'Location',
        textAlign:'left',
        width:550
    },
    {
        field: 'shipto',
        headerName: 'Shipto',
        textAlign:'center',
        width:100
    },
]
export const routeMapView_headers = [
    {
        field: 'plateNo',
        headerName: 'Plate No.',
    },
    {
        field: 'status',
        headerName: 'Status',
    },
    {
        field: 'targetAchievement',
        headerName: 'Target Achievement',
    },


]
export const realTimeStatus_headers = [
    //id, plateNo, driver, deliveryDateStart,deliveryDateEnd, status,targetAchievement
    {
        field: 'plateNo',
        headerName: 'Plate No',
    },
    {
        field: 'driver',
        headerName: 'Driver',
    },
    {
        field: 'deliveryDateStart',
        headerName: 'deliveryDateStart',
    },
    {
        field: 'deliveryDateEnd',
        headerName: 'deliveryDateEnd',
    },
    {
        field: 'status',
        headerName: 'Status',
    },
    {
        field: 'targetAchievement',
        headerName: 'Target Achievement',
    },
    {
        field: 'progress',
        headerName: 'Progress',
    },

]
export const staff_header = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'staffID',
        name: 'Staff ID'
    },
    {
        key: 'firstName',
        name: 'First Name'
    },
    {
        key: 'lastName',
        name: 'Last Name'
    },
    {
        key: 'role',
        name: 'Role'
    }, {
        key: 'mobilePhone',
        name: 'Mobile Phone'
    },
]
export const locationManage_header = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'placeName',
        name: 'Place Name'
    },
    {
        key: 'latitude',
        name: 'Latitude'
    },
    {
        key: 'longitude',
        name: 'Longitude'
    },

    {
        key: 'address',
        name: 'Address'
    },
    {
        key: 'subDistrict',
        name: 'Sub District'
    },
    {
        key: 'district',
        name: 'District'
    }, {
        key: 'province',
        name: 'Province'
    },
]
export const TruckManage_header = [
    // {
    //     field: 'id',
    //     headerName: 'ID'
    // },
    {
        field: 'vehicle_cd',
        headerName: 'Vehicle Code',
        width:'100'
    },
    {
        field: 'plate_no',
        headerName: 'Plate No',
        width:'80'
    },
    {
        field: 'plate_no',
        headerName: 'Plate No',
        width:'80'
    },
    {
        field: 'device_type',
        headerName: 'Driver type',
        width:'100'
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width:'100'
    },
    {
        field: 'Remark',
        headerName: 'remark',
        width:'150'
    },
    // {
    //     field: 'driverPhone',
    //     headerName: 'Driver Phone'
    // },
    //
    // {
    //     field: 'address',
    //     headerName: 'Address'
    // },
    // {
    //     field: 'subDistrict',
    //     headerName: 'Sub District'
    // },
    // {
    //     field: 'district',
    //     headerName: 'District'
    // }, {
    //     field: 'province',
    //     headerName: 'Province'
    // },
]
export const shipto_headers = [
    {
        field: 'shipto_name',
        headerName: 'Shipto',
        textAlign:'left',
        width:200
    },
    {
        field: 'ship_addr',
        headerName: 'Address',
        textAlign:'left',
        width:400
    },
    {
        field: 'windowTime',
        headerName: 'Window Time',
        textAlign:'center',
        width:120
    },
    {
        field: 'action',
        headerName: 'Action',
        textAlign:'right',
        width:'100'
    },
]