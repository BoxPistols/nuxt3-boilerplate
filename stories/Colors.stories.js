import { colors } from '../src/tokens/colors'

export default {
  title: 'Design Tokens/Colors',
  parameters: {
    docs: {
      description: {
        component: 'Color palette for the design system',
      },
    },
  },
}

export const ColorPalette = {
  render: () => ({
    template: `
      <div style="padding: 2rem;">
        <h2 style="margin-bottom: 2rem;">Color Palette</h2>

        <div style="margin-bottom: 3rem;">
          <h3 style="margin-bottom: 1rem;">Primary Colors</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div v-for="(color, key) in primaryColors" :key="key" style="text-align: center;">
              <div
                style="width: 80px; height: 80px; border-radius: 8px; border: 1px solid #ccc; margin-bottom: 0.5rem;"
                :style="{ backgroundColor: color }"
              ></div>
              <div style="font-size: 12px; font-family: monospace;">{{ key }}</div>
              <div style="font-size: 10px; color: #666; font-family: monospace;">{{ color }}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 3rem;">
          <h3 style="margin-bottom: 1rem;">Semantic Colors</h3>
          <div style="display: flex; gap: 2rem;">
            <div>
              <h4 style="color: #22c55e; margin-bottom: 0.5rem;">Success</h4>
              <div style="display: flex; gap: 0.5rem;">
                <div v-for="(color, key) in successColors" :key="key" style="text-align: center;">
                  <div
                    style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #ccc;"
                    :style="{ backgroundColor: color }"
                  ></div>
                  <div style="font-size: 10px; font-family: monospace;">{{ key }}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="color: #f59e0b; margin-bottom: 0.5rem;">Warning</h4>
              <div style="display: flex; gap: 0.5rem;">
                <div v-for="(color, key) in warningColors" :key="key" style="text-align: center;">
                  <div
                    style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #ccc;"
                    :style="{ backgroundColor: color }"
                  ></div>
                  <div style="font-size: 10px; font-family: monospace;">{{ key }}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="color: #ef4444; margin-bottom: 0.5rem;">Error</h4>
              <div style="display: flex; gap: 0.5rem;">
                <div v-for="(color, key) in errorColors" :key="key" style="text-align: center;">
                  <div
                    style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #ccc;"
                    :style="{ backgroundColor: color }"
                  ></div>
                  <div style="font-size: 10px; font-family: monospace;">{{ key }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        primaryColors: colors.primary,
        successColors: {
          400: colors.success[400],
          500: colors.success[500],
          600: colors.success[600],
        },
        warningColors: {
          400: colors.warning[400],
          500: colors.warning[500],
          600: colors.warning[600],
        },
        errorColors: {
          400: colors.error[400],
          500: colors.error[500],
          600: colors.error[600],
        },
      }
    },
  }),
}
