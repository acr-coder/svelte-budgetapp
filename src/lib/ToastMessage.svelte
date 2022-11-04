<script lang="ts">
    import { Icon, Toast, ToastBody, ToastHeader } from 'sveltestrap';
    
  </script>
  
  
  
  <div class="p-3 mb-3">
    <Toast class="me-1">
      <ToastHeader>
        <Icon slot="icon" name="emoji-sunglasses" class="me-2" />
        Sveltestrap
      </ToastHeader>
      <ToastBody>This is a toast with a custom icon.</ToastBody>
    </Toast>
  </div>