### Viewport

```typescript jsx
import { Viewport } from 'corgi/UI';

<Viewport
    qaId='test-component'
    render={({ visible }) => {
        if (!visible) return <div>none visible</div>;
        return <div>visible</div>;
    }}
/>;
```
