<script>
import globalStore from './stores/global-store';

export default {
  ...globalStore,
  created () {
    globalStore.dispatch('getUserInfo');
  }
}
</script>
