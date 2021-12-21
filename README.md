# BGH Solidmation

Solidmation API made with Typescript.

## Installation

```bash
yarn add solidmation
```

## Usage

```typescript
import { Solidmation } from 'solidmation';

const solidmation = new Solidmation();
await solidmation.login("user", "password");

const devices = await solidmation.getDevices();
devices[0].setStatus({ mode: 1 });
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
