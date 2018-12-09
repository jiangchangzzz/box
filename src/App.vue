<script>
import globalStore from './stores/global-store';

export default {
  created () {
    globalStore.dispatch('getUserInfo');
  }
}
</script>
