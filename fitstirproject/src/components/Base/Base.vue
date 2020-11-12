<template>
    <div>
        <LoaderOverlay/>
        <ErrorSnackbar></ErrorSnackbar>
        <SuccessSnackbar></SuccessSnackbar>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import LoaderOverlay from './Loader'
    import SuccessSnackbar from "./Success";
    import ErrorSnackbar from "./Erorr";
    export default {
        name: "Base",
        components: {SuccessSnackbar, LoaderOverlay, ErrorSnackbar},
        props: {},
        computed: {
            ...mapGetters({
                error: "error/getError",
                spinnerVisible: "spinner/getVisible",
            }),
        },
        mounted() {
        },
        created() {
        },
        methods: {}
    }
</script>