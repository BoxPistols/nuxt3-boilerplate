<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :disabled="disabled"
    :class="buttonClasses"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="inline-flex items-center">
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {{ loadingText || 'Loading...' }}
    </span>
    <span v-else class="inline-flex items-center">
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  /**
   * Button variant - affects color scheme
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'outline'
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * HTML tag to render
   */
  tag?: 'button' | 'a'
  /**
   * Button type (when tag is 'button')
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Href attribute (when tag is 'a')
   */
  href?: string
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Loading state
   */
  loading?: boolean
  /**
   * Loading text
   */
  loadingText?: string
  /**
   * Full width button
   */
  fullWidth?: boolean
  /**
   * Rounded corners
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  href: undefined,
  disabled: false,
  loading: false,
  loadingText: undefined,
  fullWidth: false,
  rounded: 'md',
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
  ]

  // Size classes
  const sizeClasses = {
    xs: ['px-2.5', 'py-1.5', 'text-xs'],
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2.5', 'text-sm'],
    lg: ['px-6', 'py-3', 'text-base'],
    xl: ['px-8', 'py-4', 'text-lg'],
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:ring-blue-500',
      'border',
      'border-blue-600',
      'hover:border-blue-700',
    ],
    secondary: [
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700',
      'focus:ring-gray-500',
      'border',
      'border-gray-600',
      'hover:border-gray-700',
    ],
    success: [
      'bg-green-600',
      'text-white',
      'hover:bg-green-700',
      'focus:ring-green-500',
      'border',
      'border-green-600',
      'hover:border-green-700',
    ],
    warning: [
      'bg-orange-600',
      'text-white',
      'hover:bg-orange-700',
      'focus:ring-orange-500',
      'border',
      'border-orange-600',
      'hover:border-orange-700',
    ],
    error: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'border',
      'border-red-600',
      'hover:border-red-700',
    ],
    ghost: [
      'bg-transparent',
      'text-gray-700',
      'hover:bg-gray-100',
      'focus:ring-gray-500',
      'border',
      'border-transparent',
    ],
    outline: [
      'bg-transparent',
      'text-gray-700',
      'hover:bg-gray-50',
      'focus:ring-blue-500',
      'border',
      'border-gray-300',
      'hover:border-gray-400',
    ],
  }

  // Rounded classes
  const roundedClasses = {
    none: ['rounded-none'],
    sm: ['rounded-sm'],
    md: ['rounded-md'],
    lg: ['rounded-lg'],
    full: ['rounded-full'],
  }

  // Width classes
  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...roundedClasses[props.rounded],
    ...widthClasses,
  ].join(' ')
})

const handleClick = (event: Event) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
