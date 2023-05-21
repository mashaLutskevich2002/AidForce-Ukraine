### Button

```typescript jsx
import { Button } from 'corgi/UI';

<Button>Click me</Button>;
```

### Button theme

```typescript jsx
import { Button, Grid } from 'corgi/UI';

<Grid grid-indent='xs'>
    <Grid.Item>
        <Button>Default yellow</Button>
    </Grid.Item>
    <Grid.Item>
        <Button theme='white'>White</Button>
    </Grid.Item>
    <Grid.Item>
        <Button theme='red'>Red</Button>
    </Grid.Item>
    <Grid.Item>
        <Button theme='gray'>Red</Button>
    </Grid.Item>
    <Grid.Item>
        <Button theme='red-border'>Red</Button>
    </Grid.Item>
</Grid>;
```

### Button size

```typescript jsx
import { Button, Box } from 'corgi/UI';

<>
    <Box margin={[null, null, 'xs', null]}>
        <Button>Default size</Button>
    </Box>
    <Box margin={[null, null, 'xs', null]}>
        <Button size='fluid'>Size fluid = width 100%</Button>
    </Box>
    <Box margin={[null, null, 'xs', null]}>
        <Button size='small'>Size small</Button>
    </Box>
</>;
```

### Button loading

```typescript jsx
import { Button } from 'corgi/UI';

<Button loading={true}>Loading</Button>;
```

### Button disabled

```typescript jsx
import { Button } from 'corgi/UI';

<Button disabled>Disabled</Button>;
```

### Button with href ( change tag button to a)

```typescript jsx
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Button } from 'corgi/UI';
const history = createMemoryHistory();

<>
    <MemoryRouter>
        <Router history={history}>
            <Button href='https://bigl.ua/'>Link to Bigl.ua</Button>
        </Router>
    </MemoryRouter>
</>;
```

### Button mode link

```typescript jsx
import { Button } from 'corgi/UI';

<Button mode='link'>Link</Button>;
```
