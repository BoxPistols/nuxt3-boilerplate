<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase"
          >
            {{ companyName }}
          </h3>
          <p class="mt-4 text-base text-gray-500 max-w-md">
            {{ description }}
          </p>
        </div>

        <!-- Links Sections -->
        <div
          v-for="section in linkSections"
          :key="section.title"
          class="col-span-1"
        >
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase"
          >
            {{ section.title }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in section.links" :key="link.name">
              <a
                :href="link.href"
                class="text-base text-gray-500 hover:text-gray-900 transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Media & Copyright -->
      <div
        class="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="flex space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            class="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <span class="sr-only">{{ social.name }}</span>
            <component :is="social.icon" class="h-6 w-6" />
          </a>
        </div>
        <p class="mt-4 md:mt-0 text-base text-gray-400">
          {{ copyrightText }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Link {
  name: string
  href: string
}

interface LinkSection {
  title: string
  links: Link[]
}

interface SocialLink {
  name: string
  href: string
  icon: string
}

interface Props {
  companyName?: string
  description?: string
  linkSections?: LinkSection[]
  socialLinks?: SocialLink[]
  copyrightText?: string
}

withDefaults(defineProps<Props>(), {
  companyName: 'My Company',
  description:
    'Making the world a better place through constructing elegant hierarchies.',
  linkSections: () => [
    {
      title: 'Solutions',
      links: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
      ],
    },
  ],
  socialLinks: () => [],
  copyrightText: () =>
    `© ${new Date().getFullYear()} My Company, Inc. All rights reserved.`,
})
</script>
