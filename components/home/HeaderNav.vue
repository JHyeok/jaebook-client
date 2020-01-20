<template>
  <header>
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 fixed-top"
    >
      <div class="container">
        <nuxt-link
          :to="`/home`"
          class="navbar-brand"
        >
          JAEBOOK
        </nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse"
        >
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <nuxt-link :to="`/account/login`" class="nav-link text-dark">
                로그인
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                :to="`/account/register`"
                class="nav-link text-dark"
              >
                회원가입
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
