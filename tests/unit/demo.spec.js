import { add } from '../../packages/demo/index';

test('测试 add 函数', () => {
    // 期望 add(1, 2) 结果为 3
    expect(add(1, 2)).toBe(3);
});
